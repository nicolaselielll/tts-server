const { convertTextToSpeech } = require('../../src/convert.js');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 204
};

const corsMiddleware = cors({ origin: '*' });

module.exports = async (req, res) => {
    corsMiddleware(req, res, async (err) => {
        if (err) return res.status(500).send(err);
        try {
            const text = req.body.text;
            const lang = req.body.lang || 'en-US';
            const voice = req.body.voice;
        
            if (!text) {
                return res.status(400).json({ success: false, message: 'No text provided.' });
            }
        
            const outputFile = await convertTextToSpeech({ 
                text: text, 
                lang: lang,
                voice: voice
            });
        
            res.status(200).json({ 
                success: true, 
                message: 'Text converted successfully.', 
                audioURL: `/output/${outputFile}`
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'An error occurred.' });
        }
    });
};