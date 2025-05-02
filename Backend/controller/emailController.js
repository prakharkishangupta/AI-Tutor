import emailService from '../services/emailService.js';

const sendSignupEmail = async (req, res) => {
    try {
        const { email, username } = req.body;

        if (!email || !username) {
            return res.status(400).json({ error: 'Email and username are required' });
        }

        await emailService.sendWelcomeEmail(email, username);
        return res.json({ message: 'Welcome email sent successfully' });
    } catch (error) {
        console.error('Email Controller Error:', error);
        return res.status(500).json({ error: 'Failed to send welcome email' });
    }
};

export default sendSignupEmail ;
