let currentColor: Spicetify.rgb;

async function handleSongChange(): Promise<void> {
    //Spicetify.showNotification("song changed");

    const currentTrack = Spicetify.Player.data.item;
    const colors = await Spicetify.extractColorPreset(currentTrack.metadata.image_url);
    const selectedColor = colors[0].colorRaw.rgb;
    Spicetify.showNotification(`${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}`);

    if(selectedColor === currentColor) {
        return;
    }

    currentColor = selectedColor;
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
