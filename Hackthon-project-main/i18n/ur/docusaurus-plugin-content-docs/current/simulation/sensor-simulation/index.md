---
title: Sensor Simulation
---

# سینسر سیمولیشن

صحیح سینسر سیمولیشن perception algorithms کی development اور testing کے لیے بہت اہم ہے۔ Gazebo اور Unity دونوں وسیع رینج کے سینسر ماڈلز فراہم کرتے ہیں۔

## LiDAR

LiDAR (Light Detection and Ranging) سینسرز ماحول کا 3D نقشہ بنانے کے لیے استعمال ہوتے ہیں۔ یہ لیزر بیمز خارج کر کے کام کرتے ہیں اور ماپتے ہیں کہ روشنی واپس آنے میں کتنا وقت لیتی ہے۔

سیمولیشن میں، LiDAR سینسرز عام طور پر ماحول میں rays cast کر کے اور objects کے ساتھ intersections detect کر کے ماڈل کیے جاتے ہیں۔ پھر simulator ایک point cloud generate کر سکتا ہے، جو 3D points کا مجموعہ ہوتا ہے جو objects کی surfaces کو ظاہر کرتا ہے۔

## Depth Cameras

Depth cameras، جنہیں RGB-D cameras بھی کہا جاتا ہے، ایک color image (RGB) اور depth image دونوں فراہم کرتے ہیں۔ Depth image میں ہر pixel تک camera سے فاصلے کی معلومات ہوتی ہے۔

Depth cameras simulate کرنے کے کئی طریقے ہیں:

- **Stereo Vision**: دو cameras simulate کریں اور stereo vision algorithms استعمال کر کے depth compute کریں۔
- **Ray Casting**: ہر pixel کے لیے camera سے ray cast کریں اور پہلے object تک distance measure کریں۔
- **Z-Buffer**: graphics rendering pipeline سے Z-buffer استعمال کر کے depth information حاصل کریں۔

## IMUs (Inertial Measurement Units)

IMUs robot کی orientation، velocity، اور acceleration measure کرنے کے لیے استعمال ہوتے ہیں۔ یہ عام طور پر ایک accelerometer اور gyroscope پر مشتمل ہوتے ہیں۔

IMU simulate کرنے کے لیے robot کی ground truth state physics engine سے read کریں اور measurements میں realistic noise شامل کریں۔
