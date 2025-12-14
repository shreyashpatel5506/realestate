import nodemailer from 'nodemailer';

// You need to configure a nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

export const generatePropertyCardHtml = (property, date, status, bookingUser = null) => {
    // A simple property card UI for the email
    return `
        <div style="border: 1px solid #ddd; border-radius: 8px; max-width: 400px; margin: 20px auto; overflow: hidden; font-family: sans-serif;">
            ${property.images && property.images.length > 0 ? `
                <img src="${property.images[0]}" alt="${property.title}" style="width: 100%; height: auto; display: block; object-fit: cover;">
            ` : ''}
            <div style="padding: 15px;">
                <h3 style="margin-top: 0; color: #333;">${property.title}</h3>
                <p style="color: #666; margin-bottom: 5px;"><strong>Price:</strong> ₹${property.price ? property.price.toLocaleString('en-IN') : 'N/A'}</p>
                <p style="color: #666; margin-bottom: 5px;"><strong>Location:</strong> ${property.city}, ${property.state}</p>
                <p style="color: #666; margin-bottom: 5px;"><strong>Type:</strong> ${property.type} for ${property.category}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;">
                <p style="margin-bottom: 5px;"><strong>Visit Date:</strong> ${new Date(date).toLocaleDateString()}</p>
                <p style="margin-bottom: 10px;"><strong>Status:</strong> <span style="font-weight: bold; color: ${status === 'booked' ? '#28a745' : status === 'cancel' ? '#dc3545' : '#ffc107'};">${status.toUpperCase()}</span></p>
                ${bookingUser ? `
                    <p style="margin-top: 10px; font-size: 0.9em; color: #007bff;">
                        <strong>User:</strong> ${bookingUser.name} (${bookingUser.email})
                    </p>
                ` : ''}
            </div>
        </div>
    `;
};


export const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `Your Real Estate App ${process.env.MAIL_USER}`,
            to, // list of receivers
            subject, // Subject line
            html, // html body
        });
        console.log(`Email sent successfully to: ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        // In a real application, you might want to log this or handle it more gracefully
    }
};