export interface Svg {
    ariaLabel?: string;
    title?: string;
    viewBox: string;
    path: string;
    circle?: any;
}

export interface Icons {
    svg: Svg;
    name: string;
    pathname?: string;
}

const searchIcon: Svg = {
    ariaLabel: "Buscar usuarios",
    title: "Buscar",
    viewBox: "0 0 24 24",
    path: "M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z",
};

const sendedIcon: Svg = {
    ariaLabel: "Enviado",
    title: "Enviado",
    viewBox: "0 0 24 24",
    path: "M0 0h24v24H0z M10 14l11 -11 M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5",
};

const settingsIcon: Svg = {
    ariaLabel: "",
    title: "",
    viewBox: "0 0 24 24",
    path: "m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z",
};
const logOutIcon: Svg = {
    ariaLabel: "Cerrar sesion",
    title: "Cerrar sesion",
    viewBox: "0 0 24 24",
    path: "M16 13v-2H7V8l-5 4 5 4v-3z M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z",
};
const logInIcon: Svg = {
    ariaLabel: "Iniciar sesion",
    title: "Ingresar",
    viewBox: "0 0 24 24",
    path: "m13 16 5-4-5-4v3H4v2h9z M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z",
};
const options = {
    ariaLabel: "Opciones",
    title: "Opciones",
    viewBox: "0 0 24 24",
    path: "M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
};
const search: Svg = {
    ariaLabel: "Buscar personas",
    title: "Buscar",
    viewBox: "0 0 24 24",
    path: "M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z",
};
const x: Svg = {
    ariaLabel: "Limpiar busqueda",
    title: "Limpiar",
    viewBox: "0 0 24 24",
    path: "m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z",
};
const add: Svg = {
    ariaLabel: "Agregar",
    title: "Añadir",
    viewBox: "0 0 24 24",
    path: "M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z",
};

const theme: Svg = {
    ariaLabel: "Selecciona un Tema",
    title: "Tema",
    viewBox: "0 0 24 24",
    path: "M7.08 11.25A4.84 4.84 0 0 1 8 9.05L4.43 5.49A9.88 9.88 0 0 0 2 11.25zM9.05 8a4.84 4.84 0 0 1 2.2-.91V2a9.88 9.88 0 0 0-5.76 2.43zm3.7-6v5A4.84 4.84 0 0 1 15 8l3.56-3.56A9.88 9.88 0 0 0 12.75 2zM8 15a4.84 4.84 0 0 1-.91-2.2H2a9.88 9.88 0 0 0 2.39 5.76zm3.25 1.92a4.84 4.84 0 0 1-2.2-.92l-3.56 3.57A9.88 9.88 0 0 0 11.25 22zM16 9.05a4.84 4.84 0 0 1 .91 2.2h5a9.88 9.88 0 0 0-2.39-5.76zM15 16a4.84 4.84 0 0 1-2.2.91v5a9.88 9.88 0 0 0 5.76-2.39zm1.92-3.25A4.84 4.84 0 0 1 16 15l3.56 3.56A9.88 9.88 0 0 0 22 12.75z",
};
const leftArrow: Svg = {
    ariaLabel: "Go back",
    title: "Back",
    viewBox: "0 0 24 24",
    path: "M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z",
};
const downArrow: Svg = {
    ariaLabel: "Go down",
    title: "Down",
    viewBox: "0 0 24 24",
    path: "M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z",
};
const send: Svg = {
    ariaLabel: "Enviar mensaje",
    title: "Enviar",
    viewBox: "0 0 24 24",
    path: "m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z",
};
const danger: Svg = {
    ariaLabel: "Hubo un error",
    title: "Error",
    viewBox: "0 0 24 24",
    path: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
};
const ownMessageIcon: Svg = {
    viewBox: "0 0 8 13",
    path: "M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z  M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z",
};
const attach: Svg = {
    viewBox: "0 0 24 24",
    path: "M1.816,15.556v0.002c0,1.502,0.584,2.912,1.646,3.972s2.472,1.647,3.974,1.647 c1.501,0,2.91-0.584,3.972-1.645l9.547-9.548c0.769-0.768,1.147-1.767,1.058-2.817c-0.079-0.968-0.548-1.927-1.319-2.698 c-1.594-1.592-4.068-1.711-5.517-0.262l-7.916,7.915c-0.881,0.881-0.792,2.25,0.214,3.261c0.959,0.958,2.423,1.053,3.263,0.215 c0,0,3.817-3.818,5.511-5.512c0.28-0.28,0.267-0.722,0.053-0.936c-0.08-0.08-0.164-0.164-0.244-0.244 c-0.191-0.191-0.567-0.349-0.957,0.04c-1.699,1.699-5.506,5.506-5.506,5.506c-0.18,0.18-0.635,0.127-0.976-0.214 c-0.098-0.097-0.576-0.613-0.213-0.973l7.915-7.917c0.818-0.817,2.267-0.699,3.23,0.262c0.5,0.501,0.802,1.1,0.849,1.685 c0.051,0.573-0.156,1.111-0.589,1.543l-9.547,9.549c-0.756,0.757-1.761,1.171-2.829,1.171c-1.07,0-2.074-0.417-2.83-1.173 c-0.755-0.755-1.172-1.759-1.172-2.828l0,0c0-1.071,0.415-2.076,1.172-2.83c0,0,5.322-5.324,7.209-7.211 c0.157-0.157,0.264-0.579,0.028-0.814c-0.137-0.137-0.21-0.21-0.342-0.342c-0.2-0.2-0.553-0.263-0.834,0.018 c-1.895,1.895-7.205,7.207-7.205,7.207C2.4,12.645,1.816,14.056,1.816,15.556z",
};
const MessageIcon: Svg = {
    viewBox: "0 0 8 13",
    path: "M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z ",
};
const EmojiIcon: Svg = {
    ariaLabel: "Ir a chats",
    title: "Chats",
    viewBox: "0 0 24 24",
    path: "M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z",
};

const chatsIcon: Svg = {
    viewBox: "0 0 24 24",
    path: "M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z",
};

const image: Svg = {
    viewBox: "0 0 24 24",
    path: "M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-13.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5.5 10h-7l4-5 1.5 2 3-4 5.5 7h-7z",
};
const camera: Svg = {
    viewBox: "0 0 24 24",
    path: "M12 9c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3z M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5z",
};

const homeIcon: Svg = {
    ariaLabel: "Ir a inicio",
    title: "Inicio",
    viewBox: "0 0 24 24",
    path: "M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z",
};

const configIcon: Svg = {
    ariaLabel: "Ir a configuraciones",
    title: "Configuraciones",
    viewBox: "0 0 24 24",
    path: "m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z",
};

const rightArrow: Svg = {
    ariaLabel: "Go back",
    title: "Back",
    viewBox: "0 0 24 24",
    path: "m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z",
};

const reloadIcon: Svg = {
    ariaLabel: "",
    title: "Reload",
    viewBox: "0 0 24 24",
    path: "M12 4c-4.418 0-8 3.58-8 8s3.582 8 8 8c3.806 0 6.993-2.66 7.802-6.22l1.95.44C20.742 18.67 16.76 22 12 22 6.477 22 2 17.52 2 12S6.477 2 12 2c3.272 0 6.176 1.57 8 4V3.5h2v6h-6v-2h2.616C17.175 5.39 14.749 4 12 4z",
};

const download: Svg = {
    viewBox: "0 0 24 24",
    path: "M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z",
};

const microIcon: Svg = {
    viewBox: "0 0 24 24",
    path: "M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z",
};

const deleteIcon: Svg = {
    viewBox: "0 0 24 24",
    path: "M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z",
};

const pauseRecord: Svg = {
    viewBox: "0 0 32 32",
    path: `M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Z M14 10h-2v12h2V10zm6 0h-2v12h2V10z`,
};

const playRecord: Svg = {
    viewBox: "0 0 24 24",
    path: "M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12Zm11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5Z",
};

const profileIcon: Svg = {
    viewBox: "0 0 24 24",
    path: "M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z",
};

const googleProvider: Svg = {
    viewBox: "0 0 24 24",
    path: "M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z",
};

const gitHubProvider: Svg = {
    viewBox: "0 0 24 24",
    path: "M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z",
};

const commentsIcon: Svg = {
    title: "Comentarios",
    viewBox: "0 0 24 24",
    path: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
};

const repostIcon: Svg = {
    title: "Repostear",
    viewBox: "0 0 24 24",
    path: "M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z",
};

const likeIcon: Svg = {
    title: "Me gusta",
    viewBox: "0 0 24 24",
    path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
};

const shareWhispTo: Svg = {
    title: "Compartir",
    viewBox: "0 0 24 24",
    path: "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z",
};

const pinPost: Svg = {
    title: "Fijar",
    viewBox: "0 0 24 24",
    path: "M17 9.76V4.5C17 3.12 15.88 2 14.5 2h-5C8.12 2 7 3.12 7 4.5v5.26L3.88 16H11v5l1 2 1-2v-5h7.12L17 9.76zM7.12 14L9 10.24V4.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v5.74L16.88 14H7.12z",
};

const notInterested: Svg = {
    title: "No interesado",
    viewBox: "0 0 24 24",
    path: "M9.5 7c.828 0 1.5 1.119 1.5 2.5S10.328 12 9.5 12 8 10.881 8 9.5 8.672 7 9.5 7zm5 0c.828 0 1.5 1.119 1.5 2.5s-.672 2.5-1.5 2.5S13 10.881 13 9.5 13.672 7 14.5 7zM12 22.25C6.348 22.25 1.75 17.652 1.75 12S6.348 1.75 12 1.75 22.25 6.348 22.25 12 17.652 22.25 12 22.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25S16.549 3.75 12 3.75zM8.947 17.322l-1.896-.638C7.101 16.534 8.322 13 12 13s4.898 3.533 4.949 3.684l-1.897.633c-.031-.09-.828-2.316-3.051-2.316s-3.021 2.227-3.053 2.322z",
};

const unfollow: Svg = {
    title: "Dejar de seguir",
    viewBox: "0 0 24 24",
    path: "M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z",
};

const block: Svg = {
    title: "Bloquear",
    viewBox: "0 0 24 24",
    path: "M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z",
};

const report: Svg = {
    title: "Bloquear",
    viewBox: "0 0 24 24",
    path: "M3 2h18.61l-3.5 7 3.5 7H5v6H3V2zm2 12h13.38l-2.5-5 2.5-5H5v10z",
};

const asideIcons: Icons[] = [
    {
        svg: homeIcon,
        pathname: "/home",
        name: "home",
    },
    {
        svg: profileIcon,
        pathname: "/profile/",
        name: "profileIcon",
    },

    {
        svg: search,
        name: "search",
    },

    { svg: chatsIcon, pathname: "/chats", name: "chats" },
    {
        svg: configIcon,
        pathname: "/configs",
        name: "configs",
    },
];

const postIcon = [commentsIcon, likeIcon, repostIcon, shareWhispTo];

const attachIcons: Icons[] = [
    { svg: camera, name: "camera" },
    {
        svg: image,
        name: "image",
    },
];

export default {
    searchIcon,
    settingsIcon,
    logOutIcon,
    logInIcon,
    x,
    add,
    theme,
    send,
    image,
    attach,
    options,
    danger,
    leftArrow,
    search,
    camera,
    asideIcons,
    attachIcons,
    ownMessageIcon,
    microIcon,
    deleteIcon,
    MessageIcon,
    pauseRecord,
    playRecord,
    profileIcon,
    EmojiIcon,
    downArrow,
    rightArrow,
    reloadIcon,
    download,
    googleProvider,
    gitHubProvider,
    commentsIcon,
    repostIcon,
    likeIcon,
    shareWhispTo,
    pinPost,
    postIcon,
    notInterested,
    unfollow,
    block,
    report,
    sendedIcon,
};
