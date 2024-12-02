import express from 'express';
import { Anthropic } from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';

config();

const router = express.Router();
const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

// Cache for database content
const databaseCache = new Map<string, string>();

async function loadDatabaseContent(filePath: string): Promise<string> {
    if (databaseCache.has(filePath)) {
        return databaseCache.get(filePath)!;
    }

    try {
        const content = await readFile(filePath, 'utf-8');
        databaseCache.set(filePath, content);
        return content;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw new Error(`Failed to read database file: ${filePath}`);
    }
}

router.post('/chat', async (req, res) => {
    try {
        const { message, context = [], selectedFiles = [] } = req.body;

        // Build context from selected database files
        let databaseContext = '';
        if (selectedFiles.length > 0) {
            for (const filePath of selectedFiles) {
                const content = await loadDatabaseContent(filePath);
                databaseContext += `Content from ${path.basename(filePath)}:\n${content}\n\n`;
            }
        }

        // Prepare messages for Claude
        const messages = [
            ...context.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];

        // Add database context if available
        if (databaseContext) {
            messages.push({
                role: 'assistant',
                content: `I have access to the following database information:\n${databaseContext}\nI'll use this context to assist you better.`
            });
        }

        // Add user's message
        messages.push({
            role: 'user',
            content: message
        });

        const response = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1024,
            messages: messages,
            temperature: 0.7,
        });

        res.json({
            message: response.content[0].text,
            role: 'assistant'
        });
    } catch (error) {
        console.error('Claude AI Error:', error);
        res.status(500).json({ error: 'Failed to process your request' });
    }
});

// Endpoint to list available database files
router.get('/database/files', async (req, res) => {
    try {
        // Implementation depends on your database structure
        // This is a placeholder that you should modify based on your needs
        const files = [
            {
                name: 'users.json',
                path: '/path/to/users.json',
                type: 'JSON',
                size: 1024,
                lastModified: new Date().toISOString()
            },
            // Add more database files as needed
        ];

        res.json(files);
    } catch (error) {
        console.error('Error listing database files:', error);
        res.status(500).json({ error: 'Failed to list database files' });
    }
});

export default router;
