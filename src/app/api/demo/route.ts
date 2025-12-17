import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Demo scheduling validation schema
const demoSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  community: z.string().min(2, 'Nama komunitas minimal 2 karakter'),
  role: z.string().min(2, 'Jabatan harus diisi'),
  preferredTime: z.string().min(1, 'Waktu demo harus dipilih')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = demoSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Create calendar event
    // 3. Send confirmation email
    // 4. Integrate with scheduling system (Calendly, etc.)
    
    // For now, we'll simulate processing
    console.log('Demo scheduling request:', validatedData);
    
    // Simulate demo scheduling
    await simulateDemoScheduling(validatedData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Demo berhasil dijadwalkan! Kami akan mengirim konfirmasi dan link meeting via email.',
        demoDetails: {
          scheduledTime: validatedData.preferredTime,
          meetingLink: 'https://meet.saga.id/demo-' + Date.now(),
          confirmationSent: true
        }
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
    
    console.error('Demo scheduling error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Terjadi kesalahan server. Silakan coba lagi.' 
      },
      { status: 500 }
    );
  }
}

// Simulate demo scheduling function
async function simulateDemoScheduling(data: any) {
  // In a real application, you would:
  // 1. Create calendar event in Google Calendar/Outlook
  // 2. Generate meeting room/link
  // 3. Send confirmation email with meeting details
  // 4. Set up reminders
  // 5. Integrate with CRM to track leads
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Demo scheduled for ${data.name} (${data.email}) at ${data.preferredTime}`);
      console.log(`Meeting link generated and confirmation email sent`);
      resolve(true);
    }, 1000);
  });
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Demo API endpoint is working',
      availableTimeSlots: [
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00'
      ]
    },
    { status: 200 }
  );
}
