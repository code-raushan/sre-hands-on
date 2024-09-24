import { parse } from "csv-parse";
import express from "express";
import fs from "fs";
const app = express();

app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Server is up",
    });
});

app.get('/read-csv', (req, res) => {
    const results = [];

    fs.createReadStream('./emails.csv')
        .pipe(parse({
            trim: true,
            skip_empty_lines: true
        }))
        .on('data', (row) => {
            if (row[0] && row[0].includes('@')) {
                results.push(row[0]);
            }
        })
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).json({ error: 'Failed to read CSV file' });
        });
});

app.listen(5555, () => {
    console.log("Server is running on port 5555");
})