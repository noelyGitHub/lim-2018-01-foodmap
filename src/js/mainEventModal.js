const eventsModal = () => {
    document.getElementById('cancelar').addEventListener('click', () => {
        document.getElementById('div_new_modal').innerHTML = '';
        document.getElementById('div_new_modal').style.display='none';
    })
    document.getElementById('pedirAhora').addEventListener('click', () => {
        document.getElementById('div_new_modal').innerHTML = '';
        document.getElementById('div_new_modal').style.display='none';
    })
}