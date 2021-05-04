var new_ques = document.getElementById("new_ques");
var search = document.getElementById("search");
var questions = document.getElementById("ques");
var ques_form = document.getElementById("ques_form");
var response_form = document.getElementById("response_form");
var ques_subject = document.getElementById("ques_sub");
var ques_text = document.getElementById("question");
var ques_submit = document.getElementById("ques_submit");
var response_question = document.getElementById("quest");
var responses = document.getElementById("responses");
var response_name = document.getElementById("res_name");
var response_comment = document.getElementById("res_comment");
var resolve = document.getElementById("resolve");
var response_submit = document.getElementById("response_submit");

var ques_no = 0;
var ques_res = [];

ques_submit.addEventListener("click", function(){
    if(ques_subject.value.length == 0 || ques_text.value.length == 0)
    {
        alert("Please enter value in the input boxes.");
    }
    ques_res[ques_no] = {};
    ques_res[ques_no].subject = ques_subject.value;
    ques_res[ques_no].question = ques_text.value;
    ques_res[ques_no].response = [];
    ques_subject.value = "";
    ques_text.value = "";
    var h2 = document.createElement("h2");
    h2.innerHTML = ques_res[ques_no].subject;
    h2.style.margin = "5px";
    var x = document.createElement("h5");
    x.innerHTML = ques_res[ques_no].question;
    x.style.margin = "5px";
    var d = document.createElement("div");
    d.appendChild(h2);
    d.appendChild(x);
    d.id = "id" + ques_no;
    d.style.borderBottom = "2px solid #909090";
    d.style.color = "#606060";
    d.style.background = "#F0F0F0";
    d.style.padding = "0px";
    d.style.margin = "0px";
    d.style.cursor = "pointer";
    questions.appendChild(d);
    d.addEventListener("click", function(){
        ques_form.style.display = "none";
        response_form.style.display = "block";
        response_question.innerHTML = "";
        var h = document.createElement("h2");
        h.innerHTML = h2.innerHTML;
        h.style.margin = "5px";
        var y = document.createElement("h5");
        y.innerHTML = x.innerHTML;
        y.style.margin = "5px";
        var a = document.createElement("div");
        a.id = d.id;
        a.appendChild(h);
        a.appendChild(y);
        a.style.color = "#606060";
        a.style.background = "#F0F0F0";
        response_question.appendChild(a);
        var i = response_question.children[0].id;
        i = i.charAt(i.length - 1);
        responses.innerHTML = "";
        ques_res[i].response.forEach(function(data, index){
            var x = document.createElement("h2");
            x.innerHTML = data.name;
            x.style.margin = "0px";
            var y = document.createElement("h5");
            y.innerHTML = data.comment;
            y.style.margin = "0px";
            var d = document.createElement("div");
            d.appendChild(x);
            d.appendChild(y);
            d.style.borderBottom = "2px solid #909090";
            d.style.color = "#606060";
            d.style.background = "#F0F0F0";
            responses.appendChild(d);
        });
    })
    ques_no = ques_no + 1;
});

resolve.addEventListener("click", function(){
    var i = response_question.children[0].id;
    document.getElementById(i).parentNode.removeChild(document.getElementById(i));
    response_question.removeChild(document.getElementById(i));
    responses.innerHTML = "";
    if(questions.childElementCount == 0)
    {
        ques_form.style.display = "block";
        response_form.style.display = "none";
    }
});

new_ques.addEventListener("click", function(){
    response_form.style.display = "none";
    ques_form.style.display = "block";
});

response_submit.addEventListener("click", function(){
    if(response_name.value.length == 0 || response_comment.value.length == 0){
        alert("Please enter valid information.");
    }
    var i = response_question.children[0].id;
    i = i.charAt(i.length - 1);
    var response_no = ques_res[i].response.length + 1;
    ques_res[i].response[response_no] = {};
    ques_res[i].response[response_no].name = response_name.value;
    ques_res[i].response[response_no].comment = response_comment.value;
    response_name.value = "";
    response_comment.value = "";
    var x = document.createElement("h2");
    x.innerHTML = ques_res[i].response[response_no].name;
    x.style.margin = "0px";
    var y = document.createElement("h5");
    y.innerHTML = ques_res[i].response[response_no].comment;
    y.style.margin = "0px";
    var d = document.createElement("div");
    d.appendChild(x);
    d.appendChild(y);
    d.style.borderBottom = "2px solid #909090";
    d.style.color = "#606060";
    d.style.background = "#F0F0F0";
    responses.appendChild(d);
    response_no = response_no + 1;
});

search.addEventListener("keyup", function(){
    var filter = search.value.toUpperCase();
    var dis_cnt = 0;
    for(var i = 0;i<ques_no;i++)
    {
        var id = "id" + i;
        var ele = document.getElementById(id);
        var txt = ele.innerText.toUpperCase();
        if(txt.indexOf(filter)>-1)
        {
            ele.style.display = "block";
            dis_cnt = dis_cnt + 1;
        }
        else{
            ele.style.display = "none";
        }
    }
    if(dis_cnt === 0)
    {
        var ele = document.getElementById("no_match");
        if(ele==null){
            var h = document.createElement("h2");
            h.innerHTML = "No match found";
            h.style.margin = "0px";
            h.style.color = "#606060";
            h.id = "no_match";
            h.style.borderBottom = "2px solid #909090";
            questions.appendChild(h);
        }
    }
    else{
        var ele = document.getElementById("no_match");
        ele.parentNode.removeChild(ele);
    }
});