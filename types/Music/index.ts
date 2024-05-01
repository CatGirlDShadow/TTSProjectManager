import { AudioLibrary } from "./AudioLibrary"

export type MusicPlayer = {
    RepeatSong: boolean,
    PlaylistEntry: number,
    CurrentAudioTitle: string,
    CurrentAudioURL: string,
    AudioLibrary: AudioLibrary
}
export type Music = {
    MusicPlayer: MusicPlayer
}