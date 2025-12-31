import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ENV } from './_core/env'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export async function storagePut(relKey: string, data: Buffer, contentType?: string) {
  const key = `community-manager/${relKey}`
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET || 'default-bucket',
    Key: key,
    Body: data,
    ContentType: contentType,
  })
  
  try {
    await s3Client.send(command)
    return { key, url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}` }
  } catch (error) {
    console.error('S3 upload error:', error)
    throw error
  }
}

export async function storageGet(relKey: string, expiresIn = 3600) {
  const key = `community-manager/${relKey}`
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET || 'default-bucket',
    Key: key,
  })
  
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn })
    return { key, url }
  } catch (error) {
    console.error('S3 get error:', error)
    throw error
  }
}
