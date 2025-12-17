---
title: مواصلاتی پیٹرنز
---

# مواصلاتی پیٹرنز

ROS 2 نوڈز کے درمیان ڈیٹا کے تبادلے کے لیے کئی مواصلاتی پیٹرنز فراہم کرتا ہے۔

## Topics

Topics ROS 2 میں سب سے عام مواصلاتی پیٹرن ہیں۔ یہ publish-subscribe ماڈل پر مبنی asynchronous، one-to-many کمیونیکیشن چینل فراہم کرتے ہیں۔

- ایک نوڈ کسی topic پر **publish** کر سکتا ہے۔
- کسی بھی تعداد میں دیگر نوڈز اس topic کو **subscribe** کر سکتے ہیں تاکہ وہ میسجز وصول کر سکیں۔

Topics مسلسل ڈیٹا اسٹریمز کے لیے مثالی ہیں، جیسے sensor data (مثلاً کیمرہ تصاویر، LiDAR سکین) یا روبوٹ کی حالت کی معلومات (مثلاً joint positions، odometry)۔

ہر topic کا ایک مخصوص **message type** ہوتا ہے، جو بھیجے جانے والے ڈیٹا کی ساخت کو define کرتا ہے۔ ROS 2 معیاری message types کا بڑا سیٹ فراہم کرتا ہے، اور developers اپنے custom message types بھی تخلیق کر سکتے ہیں۔

## Services

Services synchronous، one-to-one کمیونیکیشن پیٹرن فراہم کرتے ہیں، جو request-response ماڈل پر مبنی ہے۔

- ایک **client** نوڈ **server** نوڈ کو request بھیجتا ہے۔
- سرور request کو process کرتا ہے اور جواب (response) بھیجتا ہے۔

Services چھوٹے، transactional interactions کے لیے استعمال ہوتے ہیں، جیسے:

- روبوٹ کی موجودہ حالت معلوم کرنا۔
- کسی خاص action کو trigger کرنا (مثلاً تصویر لینا)۔
- کوئی computation perform کرنے کی درخواست دینا۔

## Actions

Actions طویل مدتی، asynchronous ٹاسکس کے لیے استعمال ہوتے ہیں جو اپنے execution کے دوران feedback فراہم کرتے ہیں۔

- ایک **action client** **goal** بھیجتا ہے ایک **action server** کو۔
- action server goal کو execute کرنا شروع کرتا ہے اور client کو periodic **feedback** دیتا ہے۔
- جب ٹاسک مکمل ہو جائے تو server final **result** client کو بھیجتا ہے۔

Actions مثالی ہیں ایسے ٹاسکس کے لیے جیسے:

- کسی مخصوص مقام تک navigate کرنا۔
- پیچیدہ manipulation ٹاسک execute کرنا۔
- predefined trajectory follow کرنا۔

Action client کسی بھی وقت goal کو cancel بھی کر سکتا ہے۔
