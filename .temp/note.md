```
gameworld  = document.getElementById('GameWorld');
character  = document.getElementById('c');

gameworld.addEventListener('click', function(e){
    console.log(e);
    character.style.left=''+e.offsetX+'px';
    character.style.top=''+e.offsetY+'px';
});

```

## Answer

```
var offsetX = e.offsetX;
var offsetY = e.offsetY;

var element = e.target;

while (element !== gameworld) {
    offsetX += element.offsetLeft;
    offsetY += element.offsetTop;
    element = element.parentNode;
}

character.style.left = offsetX + 'px';
character.style.top = offsetY + 'px';
```