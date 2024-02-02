import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(request: any) {


    const body = await request.json()
    console.log("body:",body)
    const messages = [
        { role: 'system', content: 'You are a friendly assistant.Replace *smiling* with 😊' },
        { role: 'user', content: body }
      ];

  try {
    const { data } = await axios({
      method: "POST",
      url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8`,
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
        'Content-Type': 'application/json', // Added content type header
      },
      data:{messages},
    });

    console.log(data);
    
    

    return NextResponse.json( data );
  } catch (error) {
    // console.error('Error:', error);
   
    return NextResponse.json({ error });
  }


 
}


