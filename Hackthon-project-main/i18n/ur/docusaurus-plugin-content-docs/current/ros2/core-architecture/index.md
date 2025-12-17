---
title: بنیادی فن تعمیر
---

# بنیادی فن تعمیر

ROS 2 کی بنیاد ایک distributed system پر ہے جو processes (جنہیں "nodes" کہا جاتا ہے) پر مشتمل ہے، جو ایک دوسرے کے ساتھ مواصلت کر کے پیچیدہ ٹاسکس انجام دیتے ہیں۔

## DDS (Data Distribution Service)

اصل ROS کے برعکس، جو custom communication protocol استعمال کرتا تھا، ROS 2 DDS کے اوپر بنایا گیا ہے۔ DDS ایک industry-standard middleware ہے جو real-time اور embedded systems کے لیے استعمال ہوتا ہے۔ یہ ایک publish-subscribe کمیونیکیشن ماڈل فراہم کرتا ہے جو decentralized، scalable، اور انتہائی قابل اعتماد ہے۔

DDS کے استعمال سے، ROS 2 کئی خصوصیات حاصل کرتا ہے، بشمول:

- **Decentralized Discovery**: نوڈز خود بخود نیٹ ورک پر ایک دوسرے کو تلاش کر سکتے ہیں بغیر کسی مرکزی ماسٹر کے۔
- **Quality of Service (QoS)**: ROS 2 QoS پالیسیز کا ایک جامع سیٹ فراہم کرتا ہے، جو developers کو مختلف استعمال کے کیسز (مثلاً reliability، durability، latency) کے لیے نوڈز کے درمیان مواصلت کو fine-tune کرنے کی اجازت دیتا ہے۔
- **Interoperability**: مختلف vendors کے DDS implementations ایک دوسرے کے ساتھ کام کر سکتے ہیں۔ ROS 2 کئی DDS vendors کو سپورٹ کرتا ہے، جیسے eProsima Fast DDS (default)، RTI Connext، اور Eclipse Cyclone DDS۔

## Nodes

نوڈ ROS 2 سسٹم کی بنیادی عمارت کا بلاک ہے۔ یہ ایک process ہے جو کسی مخصوص ٹاسک کو انجام دیتا ہے، جیسے:

- ایک موٹر کو کنٹرول کرنا
- sensor سے ڈیٹا پڑھنا
- روبوٹ کے لیے path plan کرنا
- ڈیٹا visualize کرنا

نوڈز عام طور پر C++ یا Python میں ROS 2 client libraries (`rclcpp` اور `rclpy`) کا استعمال کرتے ہوئے لکھے جاتے ہیں۔ انہیں مل کر پیچیدہ روبوٹک رویے تیار کیے جا سکتے ہیں۔

## ROS Graph

ROS Graph ROS 2 نوڈز اور ان کے کنکشنز کا نیٹ ورک ہے۔ یہ اس بات کی تصوراتی نمائندگی ہے کہ سسٹم کے مختلف حصے ایک دوسرے کے ساتھ کس طرح مواصلت کر رہے ہیں۔ `rqt_graph` جیسے ٹولز ROS Graph کو visualize کرنے اور نوڈز کے درمیان کمیونیکیشن کو debug کرنے کے لیے استعمال کیے جا سکتے ہیں۔
