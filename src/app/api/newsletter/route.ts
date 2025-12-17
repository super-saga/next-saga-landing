import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Newsletter subscription validation schema
const newsletterSchema = z.object({
  email: z.string().email('Email tidak valid')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = newsletterSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Add to email marketing service (Mailchimp, SendGrid, etc.)
    // 3. Send welcome email
    
    // For now, we'll simulate processing
    console.log('Newsletter subscription:', validatedData);
    
    // Simulate newsletter subscription
    await simulateNewsletterSubscription(validatedData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Berhasil berlangganan newsletter! Terima kasih atas minat Anda.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email tidak valid',
          errors: error.issues,
        },
        { status: 400 }
      );
    }
    
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Terjadi kesalahan server. Silakan coba lagi.' 
      },
      { status: 500 }
    );
  }
}

// Simulate newsletter subscription function
async function simulateNewsletterSubscription(data: any) {
  // In a real application, you would use services like:
  // - Mailchimp API
  // - SendGrid Marketing Campaigns
  // - ConvertKit
  // - Campaign Monitor
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Newsletter subscription added for ${data.email}`);
      console.log(`Welcome email sent to ${data.email}`);
      resolve(true);
    }, 500);
  });
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Newsletter API endpoint is working',
      subscriberCount: 1250 // Mock subscriber count
    },
    { status: 200 }
  );
}
