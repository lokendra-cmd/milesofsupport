import { v2 as cloudinary } from 'cloudinary';

// 🔹 Ensure Cloudinary is configured properly
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export async function POST(req, res) {
    if (req.method !== "POST") {
        return Response.status(405).json({ error: "Method Not Allowed" });
    }
    const body = await req.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
    );

    return Response.json({ signature });
}

export async function DELETE(req) {
    try {
      // ✅ Parse JSON body correctly
      const body = await req.json();
      const publicId = body.publicId; // Ensure this matches frontend key
  
      console.log("Deleting image with publicId:", publicId); // Debugging
  
      // ✅ Check if `publicId` exists
      if (!publicId) {
        return new Response(JSON.stringify({ error: "Public ID is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // 🔥 Delete image from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);
  
      // ✅ Success response
      return new Response(
        JSON.stringify({ message: "Image deleted successfully", result }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to delete image", details: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }