const convertTextToSpeech = require('../../src/convert');
const cors = require('cors');

const corsMiddleware = cors();

module.exports = async (req, res) => {
    corsMiddleware(req, res, async (err) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        var body = JSON.parse(req.body)

        try {
            const text = body.text;
            const lang = body.lang || 'en-US';
            const voice = body.voice || 'en-US-Neural2-A';

            if (!text) {
                return res.status(400).json({ success: false, message: 'No text provided.' });
            }

            const audioContent = await convertTextToSpeech({ 
                text: text, 
                lang: lang,
                voice: voice
            });

            // Return the signed URL to the client
            res.status(200).json({ success: true, audioContent: audioContent });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'An error occurred.' });
        }
    });
}
