var socket = io('http://localhost:3000');
let colors = ['#345434', '#567866'];

//Prototype para random nas cores
Array.prototype.randomElement = function(){
    return this[Math.floor(Math.random() * this.length)];
}

function renderMessage(message){
    $('.messages').append(`<div class="message"><strong>${message.author}</strong> ${message.message} </div>`);
    let authors = document.querySelectorAll('strong');
    for(let authorName of authors){
        authorName.style.color = colors.randomElement();
        
    }


}

socket.on('previousMessages', function(messages){
    for(let message of messages){
        renderMessage(message);
    }
})

socket.on('receivedMessage', function(message){
    renderMessage(message);
})

$('#chat').submit(function(event){
    event.preventDefault();


    let author = $('input[name=username]').val();
    let message = $('input[name=message]').val();

    if(author.length && message.length){
        var messageObject = {
            author: author,
            message: message,
        };

        renderMessage(messageObject)

        socket.emit('sendMessage', messageObject)
    }
})