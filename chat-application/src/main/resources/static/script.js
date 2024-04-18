var stompClient=null
function sendMessage() {

	let jsonOb = {
		name: localStorage.getItem("name"),
		message: $("#message-value").val()
	}
	stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
}

function connect()
{

        let socket=new SockJS("/server")

        stompClient=Stomp.over(socket)

        stompClient.connect({},function(frame){

            console.log("Connected : "+frame)

            $("#name-from").addClass('d-none')
              $("#chat-room").removeClass('d-none')
                //subscribe
                stompClient.subscribe("/topic/get",function(response){
                        showMessage(JSON.parse(response.body))
                })

        })

}

 function showMessage(message)
 {

    $("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.message}</td></tr>`)

 }
 
 $(document).ready((e)=>{

	 $("#login").click(()=>{


       let name=$("#name-value").val()
       localStorage.setItem("name",name)
       $("#name-title").html(`Welcome ,${name}`)
       connect();


   })
$("#send-btn").click(()=>{
    sendMessage()
   })
   
$("#logout").click(()=>{

    localStorage.removeItem("name")
    if(stompClient!==null)
    {
        stompClient.disconnect()

         $("#name-from").removeClass('d-none')
         $("#chat-room").addClass('d-none')
         console.log(stompClient)
    }

})

})
   
   

