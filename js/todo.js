$(function() {

    var $lastClicked;
    
    function onTarefaDeleteClick() {
        $(this).parent('.tarefa-item')
               .off('click')
               .hide('fast', function() {
                    $(this).remove();
                });
    }
    $('.tarefa-delete').click(onTarefaDeleteClick);
    
    function onTarefaItemClick() {
        if(!$(this).is($lastClicked)){
            if($lastClicked !== undefined){
                savePendingChange($lastClicked);
            }

            $lastClicked = $(this);

            var text = $lastClicked.children('.tarefa-texto').text();
            var html = "<input type='text' " +
                       "class='tarefa-edit' value='" +
                       text + "'>"; 
            
            $lastClicked.html(html);
            $('.tarefa-edit').keydown(onTarefaEditKeydown);
        }
    }
    $('.tarefa-item').click(onTarefaItemClick);
    
    function onTarefaEditKeydown(event) {
        if(event.which === 13){
            savePendingChange($lastClicked);
            $lastClicked = undefined;
        }
    }

    function onTarefaKeydown(event) {
        if(event.which === 13) {
            addTarefa($("#tarefa").val());
            $("#tarefa").val("");
        }
    }
    $('#tarefa').keydown(onTarefaKeydown);

    function addTarefa(text) {
        var $tarefa = $("<div />")
                    .addClass("tarefa-item")
                    .append($("<div />")
                        .addClass("tarefa-texto")
                        .text(text))
                    .append($("<div />")
                        .addClass("tarefa-delete")
                        .append($("<i />")
                            .addClass("fa fa-trash-o")))
                    .append($("<div />")
                        .addClass("clear"));

        $('#tarefa-lista').append($tarefa);

        $('.tarefa-delete').click(onTarefaDeleteClick);

        $('.tarefa-item').click(onTarefaItemClick);
    }
    
    function savePendingChange($tarefa) {
        var text = $tarefa.children('.tarefa-edit').val();
        $tarefa.empty();
        
        $tarefa.append($("<div />")
                    .addClass("tarefa-texto")
                    .text(text))
                .append($("<div />")
                    .addClass("tarefa-delete")
                    .append($("<i />")
                        .addClass("fa fa-trash-o")))
                .append($("<div />")
                    .addClass("clear"));

        /*$tarefa.append("<div class='tarefa-texto'>" + text + "</div>")
               .append("<div class='tarefa-delete'><i class='fa fa-trash-o'></i></div>")
               .append("<div class='clear'></div>");*/
        
        $('.tarefa-delete').click(onTarefaDeleteClick);
        $tarefa.click(onTarefaItemClick);
    }
    
});