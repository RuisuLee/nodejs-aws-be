import { S3Event } from "aws-lambda";
import { S3 } from "aws-sdk";
import * as csv from 'csv-parser';

const BUCKET = 'cake-bakery-app-import-service'

export const importFileParser = async (event: S3Event, _context) => {
  const s3 = new S3({ region: 'eu-west-1' });

  await Promise.all(event.Records.map(async record => {
    const s3Stream = s3.getObject({
      Bucket: BUCKET,
      Key: record.s3.object.key
    }).createReadStream();

    return await new Promise((resolve, reject) => {
      s3Stream.pipe(csv())
      .on('data', (data) => { console.log(`file parser data: ${data}`) })
      .on('end', async () => {
        console.log(`Start copy from ${BUCKET}/${record.s3.object.key}`);

        await s3.copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${record.s3.object.key}`,
          Key: record.s3.object.key.replace('uploaded', 'parsed')
        }).promise();

        console.log(`Finish copy to ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);

        await s3.deleteObject({
          Bucket: BUCKET,
          Key: record.s3.object.key
        }).promise();

        console.log(`Delete file ${record.s3.object.key}`);

        resolve();
      })
    })
  }))
}