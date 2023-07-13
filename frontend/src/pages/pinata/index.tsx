//require('dotenv').config();
import axios from 'axios'
import FormData from 'form-data'
import { useState } from 'react'

const key: string = 'c9a470ff14f8d2d9e14d'
const secret: string = '6b849e1f90c37cd4d0bb10bd69bdac6448230fa4f35b0e37f39c40be47759625'

// export const uploadJSONToIPFS = async (JSONBody: object) => {
//   const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
//   //making axios POST request to Pinata ⬇️
//   return axios
//     .post(url, JSONBody, {
//       headers: {
//         pinata_api_key: key,
//         pinata_secret_api_key: secret,
//       },
//     })
//     .then(function (response) {
//       return {
//         success: true,
//         pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
//       }
//     })
//     .catch(function (error) {
//       console.log(error)
//       return {
//         success: false,
//         message: error.message,
//       }
//     })
// }

export const uploadFileToIPFS = async (file: File) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
  //making axios POST request to Pinata ⬇️

  let data = new FormData()
  data.append('file', file)

  const metadata = JSON.stringify({
    name: 'testname',
    keyvalues: {
      exampleKey: 'exampleValue',
    },
  })
  data.append('pinataMetadata', metadata)

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1,
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2,
        },
      ],
    },
  })
  data.append('pinataOptions', pinataOptions)

  const response = await axios
    .post(url, data, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data`,
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'pinata_api_key': key,
        'pinata_secret_api_key': secret,
      },
    })
    // .then(response => {
    //   console.log('image uploaded', response.data.IpfsHash)
    //   return {
    //     success: true,
    //     pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
    //   }
    // })
    // .catch(function (error) {
    //   console.log(error)
    //   return {
    //     success: false,
    //     message: error.message,
    //     pinataURL: '',
    //   }
    // })
    if(response.status === 200) {
      console.log('image uploaded', response.data.IpfsHash)
      return {
        success: true,
        pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      }
    }
    else {
      console.log(response)
      return {
        success: false,
        message: response.statusText,
        pinataURL: '',
      }
    }
}

// export function Pinata() {
//   async function OnChangeFile(e) {
//     var file = e.target.files[0]

//     //check for file extension
//     try {
//       //upload the file to IPFS
//       const response = await uploadFileToIPFS(file)
//       if (response.success === true) {
//         console.log('Uploaded image to Pinata: ')
//       }
//     } catch (e) {
//       console.log('Error during file upload', e)
//     }
//   }

//   return (
//     <div>
//       <h1>Pinata</h1>
//       {/* form */}
//       <form>
//         <div>
//           <label className="mb-2 block text-sm font-bold text-purple-500" htmlFor="image">
//             Upload Image (&lt;500 KB)
//           </label>
//           <input type={'file'} onChange={OnChangeFile}></input>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }
