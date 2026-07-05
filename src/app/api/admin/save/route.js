import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { customerData } from "@/data/customerData";

export async function POST(request) {
  try {
    const body = await request.json();
    const { index, updatedItem } = body;

    if (index === undefined || index < 0 || index >= customerData.length) {
      return NextResponse.json({ success: false, error: "Invalid index provided" }, { status: 400 });
    }

    // Update in-memory copy
    customerData[index] = {
      ...customerData[index],
      ...updatedItem
    };

    // Serialize to javascript file format
    const filePath = "C:/Users/CPbros_P/Desktop/cshelper/src/data/customerData.js";
    const fileContent = `export const customerData = ${JSON.stringify(customerData, null, 2)};\n`;

    fs.writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({ success: true, message: "Data file successfully updated!" });
  } catch (error) {
    console.error("Failed to save data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
