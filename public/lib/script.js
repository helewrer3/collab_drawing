window.addEventListener('load', () => {
    window.alert("To begin collaboration, share your URL with your teammates and start drawing when everyone has joined!")
    const socket = io(), canvas = document.querySelector('#canvas'), ctx = canvas.getContext('2d')
    let isDragging = false, color = getRandomColor(), wid = 10, type = 'round', og_color = color
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    document.getElementById('color-bar').value = og_color
    document.getElementById('stroke-bar').value = wid

    socket.emit('login', {url: window.location.pathname})

    socket.on('getstarting', () => {ctx.beginPath()})
    
    socket.on('getending', () => {ctx.beginPath()})
    
    socket.on('getdrawing', (data) => {
        ctx.lineWidth = wid
        ctx.lineCap = type
        ctx.strokeStyle = data.color
        ctx.lineTo(data.x, data.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(data.x, data.y)
    })
    
    function startPos(e){
        ctx.beginPath()
        isDragging = true
        socket.emit('isstarting', {url: window.location.pathname})
        paint(e)
    }
    
    function endPos(){
        isDragging = false
        socket.emit('isending', {url: window.location.pathname})
        ctx.beginPath()
    }
    
    function paint(e){
        if(isDragging){
            ctx.lineWidth = wid
            ctx.lineCap = type
            ctx.strokeStyle = color
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(e.offsetX, e.offsetY)
            socket.emit('isdrawing', {x: e.offsetX, y: e.offsetY, color: color, url: window.location.pathname})
        }
    }

    document.getElementById('eraser-btn').onclick = () => color='white'
    document.getElementById('pen-btn').onclick = () => color=og_color
    document.getElementById('color-bar').onchange = () => color = og_color = document.getElementById('color-bar').value
    document.getElementById('stroke-bar').onchange = () => wid = document.getElementById('stroke-bar').value

    canvas.addEventListener('mousedown', startPos)
    canvas.addEventListener('mouseup', endPos)
    canvas.addEventListener('mousemove', paint)
})

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
}