exports.handler = async (event) => {
    // TODO implement
    
    //Use SSM client 
    const ssmparam = new (require('aws-sdk/clients/ssm'))();
	console.log(ssmparam);
	//const AWS = new (require('aws-sdk'))();
    //const s3 = new AWS.S3();
    const s3 = new ssmparam.S3();
	
    //Javascript SDK Methods to get key&value from paramstore: 
	  const fparam = await ssmparam.getParameters({
			Names: ['/life-app/staging/UserName']
	    }).promise();
    
    //Upload file into s3 Bucket
	const upload = async () =>{
		const params = {
		ACL: "public-read",
		Body: fparam,
		ContentType: "text/html",
		Bucket: "dxcassign",
		Key: "paramvalue.txt",
		};
	
		return await new Promise((resolve,reject) => {
			s3.putObject(params, (err,results) => {
				if (err) reject(err);
				else resolve(results);
			});
		});
	};
	
	const main = async (event) => {
		console.log("Event:", event);
		return upload();
	}
}
