<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');


$data = array('error_code'=>1,'msg'=>'File Upload Error Occured! Try Again.');
if(isset($_FILES['file'])){
    if($_FILES['file']['error'] == 0){
        $filename = $_FILES['file']['name'];
        $basename = pathinfo($filename , PATHINFO_FILENAME);
        $ext = pathinfo($filename ,  PATHINFO_EXTENSION);
        $basename = str_replace(array(' ','(',')'),'',$basename);
        $basename = strtolower($basename);
        $basename = $basename.'-'.time();
        $newfilename = $basename.'.'.$ext;
        $fileserver = './nodeserver/uploads/'.$newfilename;
        if(in_array($ext,array('jpg','jpeg','png'))){
            if(move_uploaded_file($_FILES['file']['tmp_name'],$fileserver)){
                $uploadfilepath = __DIR__.'/nodeserver/uploads/'.$newfilename;
                if($ext == 'jpg' || $ext == 'jpeg'){
                    $new = imagecreatefromjpeg($uploadfilepath);
                }
                if($ext == 'png'){
                    $new = imagecreatefrompng($uploadfilepath);
                }
                $width = imagesx($new);
                $height = imagesy($new);
                $cropwidth = 1540;
                $cropheight = 421;
                $newfilename1 = $basename.'-'.$cropwidth.'X'.$cropheight.'.'.$ext;
                $fileserver1 = './nodeserver/uploads/'.$newfilename1;
                $cropratio = $cropwidth/$cropheight;
                if($width < $cropwidth){
                    $cropwidth = $width;
                    $cropheight = $cropwidth/$cropratio;
                    $cropheight = intval($cropheight);
                }
                if($height < $cropheight){
                    $cropheight = $height;
                    $cropwidth = $cropheight/$cropratio;
                    $cropwidth = intval($cropwidth);
                }

                $croppedimage1 = imagecrop($new, ['x' => 0, 'y' => 0, 'width' => $cropwidth, 'height' => $cropheight]);

                if($ext == 'jpg' || $ext == 'jpeg'){
                    imagejpeg($croppedimage1,$fileserver1,100);
                }
                if($ext == 'png'){
                    imagepng($croppedimage1,$fileserver1,100);
                }

                $cropwidth = 634;
                $cropheight = 421;
                $newfilename2 = $basename.'-'.$cropwidth.'X'.$cropheight.'.'.$ext;
                $fileserver2 = './nodeserver/uploads/'.$newfilename2;
                $cropratio = $cropwidth/$cropheight;
                if($width < $cropwidth){
                    $cropwidth = $width;
                    $cropheight = $cropwidth/$cropratio;
                    $cropheight = intval($cropheight);
                }
                if($height < $cropheight){
                    $cropheight = $height;
                    $cropwidth = $cropheight/$cropratio;
                    $cropwidth = intval($cropwidth);
                }

                $croppedimage2 = imagecrop($new, ['x' => 0, 'y' => 0, 'width' => $cropwidth, 'height' => $cropheight]);

                if($ext == 'jpg' || $ext == 'jpeg'){
                    imagejpeg($croppedimage2,$fileserver2,100);
                }
                if($ext == 'png'){
                    imagepng($croppedimage2,$fileserver2,100);
                }


                $data = array('error_code'=>0,'filename1'=>$newfilename1,'filename2'=>$newfilename2);
            }
        }else{
            $data = array('error_code'=>1,'msg'=>'Uploaded File Format Does Not Support! Try Again.');
        }

    }
}

echo json_encode($data);