const data = document.getElementById('date')
const urlApod = `https://api.nasa.gov/planetary/apod?api_key=`
const key = `12He3de9BRnJDJipPGdxAtqvoxg0OeghjGHZVeib`

const requisicao = new XMLHttpRequest();

requisicao.open('GET',urlApod+key,true);
requisicao.setRequestHeader("content-type", "aplication/json")
requisicao.send()

requisicao.addEventListener('load',function(){
        if(requisicao.status==200 && requisicao.readyState==4){
                const resposta = JSON.parse(requisicao.responseText)
                if(resposta.media_type==="image"){
                document.getElementById('titulo').textContent = resposta.title
                document.getElementById('img-container').src = resposta.hdurl
                document.getElementById("explicacao").textContent = resposta.explanation
                document.getElementById('video-container').style.display='none'
                document.getElementById('link').style.display='none'
                document.getElementById('img-container').style.display=''
                }
                else if(resposta.media_type==="video"){
                        console.log(resposta.url)
                        if(resposta.url.includes('html')==true){
                                document.getElementById('video-container').style.display='none'
                                document.getElementById('img-container').style.display='none'
                                document.getElementById('link').style.display=''
                                document.getElementById('link').href = resposta.url
                        }
                        else{
                        document.getElementById('titulo').textContent = resposta.title
                        document.getElementById('video-container').src = resposta.url
                        document.getElementById("explicacao").textContent = resposta.explanation
                        document.getElementById('video-container').style.display=''
                        document.getElementById('img-container').style.display='none'
                        document.getElementById('link').style.display='none'
                        }
                }
        }
})

data.addEventListener('change', function(){
        requisicao.open('GET',`${urlApod}${key}&date=${data.value}`,true)
        requisicao.setRequestHeader('content-type',"aplication/json");
        requisicao.send()
})



