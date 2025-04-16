const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "https:"],
            "script-src": ["'self'", "'unsafe-inline'", "https:", "http:"],
            "style-src": ["'self'", "'unsafe-inline'", "https:", "http:"],
            "font-src": ["'self'", "https:", "data:", "http:"],
            "default-src": ["'self'", "https:", "http:", "data:", "blob:"],
        },
    },
}));

// Enable compression
app.use(compression());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use EJS Layouts
app.use(expressLayouts);
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'SolutionPath Consulting',
        description: 'Professional IT Consulting Services'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - SolutionPath Consulting',
        description: 'Learn more about our company and mission'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Our Services - SolutionPath Consulting',
        description: 'Explore our range of professional services'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us - SolutionPath Consulting',
        description: 'Get in touch with our team'
    });
});

app.get('/home', (req, res) => {
    res.render('index', {
        title: 'Home - SolutionPath Consulting',
        description: 'Welcome to SolutionPath Consulting - Your trusted partner in digital transformation'
    });
});

app.get('/our-work', (req, res) => {
    res.render('our-work', {
        title: 'Our Work - SolutionPath Consulting',
        description: 'Explore our portfolio of successful projects and digital solutions'
    });
});

app.get('/pricing', (req, res) => {
    res.render('pricing', {
        title: 'Pricing - SolutionPath Consulting',
        description: 'Explore our transparent pricing plans and choose the perfect solution for your business'
    });
});

app.get('/privacy', (req, res) => {
    res.render('privacy', {
        title: 'Privacy Policy - SolutionPath Consulting',
        description: 'Privacy Policy for SolutionPath Consulting SRL'
    });
});

app.get('/terms', (req, res) => {
    res.render('terms', {
        title: 'Terms and Conditions - SolutionPath Consulting',
        description: 'Terms and Conditions for SolutionPath Consulting SRL'
    });
});

// Contact form POST handler
app.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Email content
        const mailOptions = {
            from: email,
            to: 'solutionpathconsulting.ro@gmail.com',
            subject: `Contact Form: ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `,
            html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        // Redirect with success
        res.redirect('/contact?success=true');
    } catch (error) {
        console.error('Error sending email:', error);
        res.redirect('/contact?error=true');
    }
});

// Serve static files (moved after routes)
app.use(express.static(path.join(__dirname, 'public')));

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'solutionpathconsulting.ro@gmail.com',
        pass: process.env.EMAIL_PASSWORD // We'll set this up in .env file
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 