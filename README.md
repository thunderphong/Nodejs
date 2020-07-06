# Nodejs Note
Một số thứ cần nhớ sau khi học khóa NodeJS Basic

## Arrow Function & Normal Function

Sự khác nhau giữa arrow function và normal function là ở biến this. Arrow fn không thể nhận biết biến this bên trong nó. Normal fn thì có thể.

![ES6 Arrow Functions Explained - Jake Zappin - Medium](https://miro.medium.com/max/1140/1*Fh0nmaRGUz2C__0-IgRe2w.png)

## Biến Process 
 Một trong những object lớn và quan trọng nhất của NodeJS là biến process. Process giống như window.document, nó chứa tất cả các tác vụ, biến quan trọng mà NodeJS cần để chạy server. Một trong số đó là process.env.
 
 ![Process.env](https://lh3.googleusercontent.com/pw/ACtC-3cYGRSX4dR6XsQn_Mtcpz4-KXECIPyl6ePZ2FEhXk0GCpyaRmBaS3iZqqf5mGT1sKF7CPwNEFthsvleXDdlpz2LtxkRE1deAbQBjs98uhksPrmEeFWnGYkmcMeZJrzaqgMxENatCczFdwpygZkdmP_S=w863-h584-no?authuser=0)
## NodeJS Callback - Call stack - Event loop 
Js là ngôn ngữ single-threaded, vậy nên nó sẽ chỉ thực hiện được 1 tác vụ ở 1 thời điểm. Tuy nhiên không có nghĩa là nó không thể thực hiện song song tác vụ. Để làm điều này, nó nhờ tới Web APIs, Call stack và Event loop.

![Call stack illustrate - # Philip Roberts](https://lh3.googleusercontent.com/pw/ACtC-3fj-TMaXZ6pqXNps7ugjt9_jMTPDk0qwEtoYLjhGA1wW7GsYAqQiYiZdH10fNT3igwFRF8Iu3Z3_72mTWTJt3BbW3_H5JnPpc2_ZL3_gnMhUtNk_0900jF0zyUhIyCYPz8E_OM4RFNHGYyK5wh0bKLJ=w1677-h943-no?authuser=0)

Để một tác vụ chậm (blocking task) được thực hiện song song với chương trình chính, JS định nghĩa nó là async code (AC) - async callback.  AC được gọi vào stack, nhưng không thực thi ở đó. Nó sẽ được stack gọi WebAPIs sang, nhận nó và xử lý nó tại đó. Sau khi xử lý xong, WebAPIs trả kết quả của AC xuống task queue. Đây là lúc event loop xuất hiện.

Event loop sẽ canh xem khi nào stack rỗng, thì nó sẽ đưa task đầu tiên trong queue vào xử lý. Vậy, đó là cách JS và web browser xử lý async code - callback.

Vậy, nếu trong khi AC đang được xử lý, ta cần sử dụng kết quả của nó thì như thế nào? Một cách sơ khai, người ta sẽ chèn thêm một hàm lấy kết quả vào bên trong khối async code ấy. Nó cũng được gọi là callback, hay callback bên trong callback. Xem hình bên dưới.
![Callback in callback - Dev Ed](https://lh3.googleusercontent.com/pw/ACtC-3fHcAYKpHKNYp4UClpbuiYNzzg7vMrd-SUN2rcro9zKsm0BTYB0mHCdaS8bWGStH2R7EyivaNMDyYji-5YH40w_2_oPmFtCHfCoJAXdTKjS5vjJLJ8L-JhTjDgoFRCSabxe5hdvZXe_RIUqMIrDx_LJ=w1677-h943-no?authuser=0)
Bên trong hàm setTimeout là một callback(1), và bên trong callback(1) đó lại là một callback(2) khác để sử dụng kết quả của callback(1).

Sơ khai thì là vậy, nhưng nếu viết code thế này thì nhược điểm của nó hiện ra rất rõ ràng, callback hell. Callback hell là một chuỗi các callback mà callback này lồng trong callback khác. 
![Callback hell - Dev Ed](https://lh3.googleusercontent.com/pw/ACtC-3fY6P5dIn75pGNUViysbuSvUazC-JqiUrmJfAfE2MZ2NOWk5xjafsYw-53nUqln_ss8D6iUjVbhEGJfj6iuoWUmI3u5XY50XdO8aR-uUVgouH1TFgUH7xwgd1zorteIl_K2bsATJo67PheoJBDDi5pC=w936-h292-no?authuser=0)

Để xử lý cái này thì cần promise. Tính sau