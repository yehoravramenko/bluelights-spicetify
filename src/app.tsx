let currentColor: Spicetify.rgb;
// let client = new net.Socket();

async function handleSongChange(): Promise<void> {
    //Spicetify.showNotification("song changed");

    const currentTrack = Spicetify.Player.data.item;
    const colors = await Spicetify.extractColorPreset(currentTrack.metadata.image_url);
    const selectedColor = colors[0].colorRaw.rgb;
//    Spicetify.showNotification(`${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}`);
    
    if(selectedColor === currentColor) {
        return;
    }

    currentColor = selectedColor;

    console.log(currentColor.r, currentColor.g, currentColor.b);
    const colorData = `${currentColor.r.toString(16).padStart(2, '0')}${currentColor.g.toString(16).padStart(2, '0')}${currentColor.b.toString(16).padStart(2, '0')}`;

    Spicetify.showNotification(colorData);

    const url = "http://127.0.0.1:6969";
    const response = await fetch(url, {method: 'POST', body: colorData})
        .catch(error => console.log("error: ", error))
    
    if(!response.ok) {
        console.log("damn");
        return;
    }
}

function main(): void {
    Spicetify.Player.addEventListener("songchange", handleSongChange);
    Spicetify.Player.addEventListener("onplaypause", (event) => {
        if(!event?.data.isPaused) {
            handleSongChange();
        }
    });
}

export default main;
