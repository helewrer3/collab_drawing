window.addEventListener('load', () => {
    window.alert("To begin collaboration, share your URL with your teammates and start drawing when everyone has joined!")
    const socket = io(), canvas = document.querySelector('#canvas'), ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let isDragging = false, color = getRandomColor(), wid = 10, type = 'round', og_color = color, curr = {}
    socket.emit('login', {url: window.location.pathname})
    document.getElementById('stroke-bar').value = wid
    document.getElementById('color-bar').value = og_color
    document.getElementById('color-bar').onchange = () => color = og_color = document.getElementById('color-bar').value
    document.getElementById('stroke-bar').onchange = () => wid = document.getElementById('stroke-bar').value
    document.getElementById('eraser-btn').onclick = () => color='white'
    document.getElementById('pen-btn').onclick = () => color=og_color
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    
    function onMouseDown(e){
        isDragging = true
        updateCoord(e)
    }

    function onMouseUp(e){
        if(!isDragging) return
        isDragging = false
        drawLine(curr.x, curr.y, e.offsetX, e.offsetY, wid, color, true)
    }

    function onMouseMove(e){
        if(!isDragging) return
        drawLine(curr.x, curr.y, e.offsetX, e.offsetY, wid, color, true)
        updateCoord(e)
    }

    socket.on('getdrawing', (data) => {
        console.log(data)
        drawLine(data.x0, data.y0, data.x, data.y, data.w, data.c, false)
    })

    function drawLine(x0, y0, x, y, w, c, f){
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x, y)
        ctx.lineWidth = w
        ctx.lineCap = type
        ctx.strokeStyle = c
        ctx.stroke()
        ctx.closePath()
        if(!f)return
        socket.emit('isdrawing', {url: window.location.pathname, x0: x0, y0: y0, x: x, y: y, w: w, c: c})
    }
    
    function updateCoord(e){
        curr.x = e.offsetX
        curr.y = e.offsetY
    }

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    }
    
})