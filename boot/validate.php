<?php include __DIR__.'/database.php';
use Medoo\Medoo;
if(isset($_POST["codigo"]))
{
$currdate=date("Y-m-d");
$validcode=$_POST["codigo"];
$couponstype=$_POST["plan"];

//echo $currdate;
$data = $db->query("SELECT * FROM coupon where CouponCode='".$validcode."' and CouponEnd_Date>='".$currdate."' and CouponType='".$couponstype."'")->fetchAll();
//echo "db connection successfull";
//var_dump($data);
//echo $data[0][1];
//echo implode("," ,$data);
if(@$data[0][1]=="" || @$data[0][1]=="undefined")
{
	echo '<script>alert("suscripcion es valida")</script>';
}
else
{
	echo '<script>alert("error intente de nuevo")</script>';
}
//echo $_REQUEST["getid"];

echo '<script>window.location.href="index.php"</script>';
}
else
{
}
?>
