function insertAfter(newNode, referenceNode) {
   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

Ext.onReady(function() {
   var str = document.location.href.substr(document.location.href.search('/front/') + 7);
   var id = str.substr(str.search('id=') + 3)
   var itemtype = str.substr(0, str.search('.form.php'));
   
   var hidden_fields = "<input type='hidden' name='plugin_tag_etiquette_id' value='"+id+"'>" +
      "<input type='hidden' name='plugin_tag_etiquette_itemtype' value='"+itemtype+"'>";
   
   Ext.Ajax.request({
      url: "../plugins/tag/ajax/tags_values.php?id=" + id + "&itemtype=" + itemtype,
      success: function(data) {
         //Ext.select('#mainformtable tr').insertHtml('afterEnd', data.responseText);
         //$("#mainformtable tr").eq(0).after(data.responseText + hidden_fields);
         
         var tr = document.createElement('tr');
         tr.innerHTML = data.responseText + hidden_fields;
         insertAfter(tr, document.querySelectorAll("tr.headerRow")[0]);
         
         var elements = document.querySelectorAll('.chosen-select-no-results');
         for (var i = 0; i < elements.length; i++) {
            new Chosen(elements[i], {no_results_text: "Aucun tag trouvé."});
         }
         
      }
   });
});
