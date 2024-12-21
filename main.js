import crypto from 'crypto'


const algoritmo = 'aes-256-crt'
const clave_secreta = 'codercodercodercoderco' // pass 32 caracteres
const iv = 'codercodercoderc' //vector de inicializaicon de 16 caracteres

const encryp = (password)=> {
    const cipher = crypto.createCipheriv (algoritmo, clave_secreta, iv) // generar password utilizando el iv, algoritmo y contrase;a
    const encryptPass = Buffer.concat([cipher.update(password) , cipher.final()])
}                                      //.update = actualizo el cipher con la contrase;a enviada
                                       //.final = retorno el resultado de dicha encriptacion

    const passE = encryptPass.toString('hex')
    console.log (passE)
    return passE

const decrypt = (encryptedPassword) => {

}

const update = Buffer()