//Dont change it
//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide = {};
            cur_slide["in"] = data[0];
            console.log("inside set_process_in", data);
            this_e.addAnimationSlide(cur_slide);
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
            console.log("inside set_process_out", data);
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }
            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(data.in) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var checkioInput = data.in;
            var userResult = data.out;

            if(data.ext){
                var rightResult = data.ext["answer"];
                var result = data.ext["result"];
                var result_addon = data.ext["result_addon"];


                //if you need additional info from tests (if exists)
                var explanation = data.ext["explanation"];

                $content.find('.output').html('&nbsp;Your result:&nbsp;' + ext.JSON.encode(userResult));

                if (!result) {
                    $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(checkioInput) + ')');
                    $content.find('.answer').html('Right result:&nbsp;' + ext.JSON.encode(rightResult));
                    $content.find('.answer').addClass('error');
                    $content.find('.output').addClass('error');
                    $content.find('.call').addClass('error');
                }
                else {
                    $content.find('.call').html('Pass: checkio(' + ext.JSON.encode(checkioInput) + ')');
                    $content.find('.answer').remove();
                }    
            }else{
                $content.find('.call').html('Pass: checkio(' + ext.JSON.encode(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            
            //Dont change the code before it

            //Your code here about test explanation animation
            //$content.find(".explanation").html("Something text for example");
            //
            //
            //
            //
            //


            this_e.setAnimationHeight($content.height() + 60);

        });
        
        var $tryit;

        ext.set_console_process_ret(function (this_e, ret) {
            try {
                ret = JSON.parse(ret);
            }
            catch (err) {
            }
            $tryit.find('.checkio-result').html("Checkio return<br>" + JSON.stringify(ret));
        });

        ext.set_generate_animation_panel(function (this_e) {
            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find(".tryit-content");
            


            $tryit.find('.bn-check').click(function(e){
                var $input = $tryit.find('.input-list');
                var inputList = $input.val().split(" ");
                var tryList = [];
                for (var i = 0; i < inputList.length; i++) {
                    if (isNaN(inputList[i]) || inputList[i] === "") {
                        continue;
                    }
                    tryList.push(Number(inputList[i]));
                }
                $input.val(tryList.join(" "));
                this_e.sendToConsoleCheckiO(tryList);
                e.stopPropagation();
                return false;
            });

        });
       

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";
        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
