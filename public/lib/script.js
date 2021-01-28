window.addEventListener('load', () => {
    window.alert("To begin collaboration, share your URL with your teammates and start drawing when everyone has joined!")
    const socket = io(), canvas = document.querySelector('#canvas'), ctx = canvas.getContext('2d'), 
    colors = ["tomato", "steelblue", "teal", "black", "goldenrod", "fuchsia", "peru", "lightskyblue", "greenyellow", "olive", "darkred", "indigo", "midnightblue"]
    let isDragging = false, color = colors[Math.floor(Math.random()*colors.length)], wid = 10, type = 'round'
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    
    socket.emit('login', {url: window.location.pathname})

    socket.on('getstarting', () => {
        ctx.beginPath()
    })
    
    socket.on('getending', () => {
        ctx.beginPath()        
    })
    
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
            ctx.lineTo(e.clientX, e.clientY)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(e.clientX, e.clientY)
            socket.emit('isdrawing', {x: e.clientX, y: e.clientY, color: color, url: window.location.pathname})
        }
    }

    canvas.addEventListener('mousedown', startPos)
    canvas.addEventListener('mouseup', endPos)
    canvas.addEventListener('mousemove', paint)
})