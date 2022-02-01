export default function sendConfirmationEmail(username, email){
    const data = {
        user_id: "user_tIQlJ3cxmXiPoYfZLrN0D",
        service_id: "default_service",
        accessToken: "4add1c1c6cb93c7db78c3701bb936a20",
        template_id: "template_okbnkvs",
        template_params: {
            username: username,
            user_email: email
        }
    }    
    const body = JSON.stringify(data)
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    }).then(response => response.text())
    .then(data => {
        console.log(data)
    }).catch(console.log)
}