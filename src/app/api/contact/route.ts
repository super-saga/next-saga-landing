import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  community: z.string().min(2, 'Nama komunitas minimal 2 karakter'),
  units: z.string().min(1, 'Jumlah unit harus diisi'),
  message: z.string().min(10, 'Pesan minimal 10 karakter')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    
    // For now, we'll simulate processing
    console.log('Contact form submission:', validatedData);
    
    // Simulate email sending (replace with actual email service)
    await simulateEmailSending(validatedData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Pesan berhasil dikirim. Tim kami akan menghubungi Anda dalam 24 jam.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Data tidak valid',
          errors: error.issues,
        },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Terjadi kesalahan server. Silakan coba lagi.' 
      },
      { status: 500 }
    );
  }
}

// Simulate email sending function
async function simulateEmailSending(data: any) {
  // In a real application, you would use services like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email sent to admin about contact from ${data.name} (${data.email})`);
      resolve(true);
    }, 1000);
  });
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  );
}
