export const getUsuariosByEmail = (email, usuarios) => {

    if (email === '') {
        return [];
    }

    email = email.toLowerCase();
    return usuarios.filter(usuario => usuario.correo.toLowerCase().includes(email));
}

export const ordenarUsuariosByFecha = (usuarios) => {

    var usuariosVitalicios = usuarios.filter(usuario => usuario.licencia.tipo === 'PV');
    var usuariosAnuales = usuarios.filter(usuario => usuario.licencia.tipo === 'PA').sort((a, b) => new Date(a.fechas.finalizacion) - new Date(b.fechas.finalizacion));

    var usersOrder = usuariosAnuales.concat(usuariosVitalicios);

    return usersOrder;
}

export const ordenarRegistrosByEstado = (registros) => {

    var regActivo = registros.filter(registro => registro.estado === true);
    var regsInactivos = registros.filter(registro => registro.estado === false);

    var regsInactivosOrder = regsInactivos.sort((a, b) => new Date(b.registro.fechaPago) - new Date(a.registro.fechaPago));

    var regsOrder = regActivo.concat(regsInactivosOrder);

    return regsOrder;
}
