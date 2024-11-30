const express = require('express');
const db = require('./db');
const router = express.Router();


router.post('/tasks', (req, res) => {
    const { title, description, due_date, status } = req.body;
    db.run(
        `INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)`,
        [title, description, due_date, status || 'Pending'],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});


router.get('/tasks', (req, res) => {
    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


router.put('/tasks/:id', (req, res) => {
    const { title, description, due_date, status } = req.body;
    const { id } = req.params;
    db.run(
        `UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?`,
        [title, description, due_date, status, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
});


router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM tasks WHERE id = ?`, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;
