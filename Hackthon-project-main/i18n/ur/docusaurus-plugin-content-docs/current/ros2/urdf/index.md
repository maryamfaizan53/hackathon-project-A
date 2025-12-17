---
title: URDF (یونائیفائیڈ روبوٹ ڈسکرپشن فارمیٹ)
---

# URDF (یونائیفائیڈ روبوٹ ڈسکرپشن فارمیٹ)

Unified Robot Description Format (URDF) ایک XML فارمیٹ ہے جو روبوٹ کی جسمانی ساخت کو بیان کرنے کے لیے استعمال ہوتا ہے۔ یہ ROS کے ماحولیاتی نظام کا ایک اہم حصہ ہے اور ماڈلنگ، سیمولیشن، اور visualization کے لیے استعمال ہوتا ہے۔

ایک URDF فائل میں درج ہوتا ہے:

- **Links**: روبوٹ کے rigid حصے۔
- **Joints**: links کے درمیان کنکشن، جو revolute (گھومنے والے)، prismatic (سلائیڈنگ) یا fixed ہو سکتے ہیں۔
- **Visual properties**: links کی شکل اور ظاہری شکل۔
- **Collision properties**: collision detection کے لیے links کی شکل۔
- **Inertial properties**: links کا mass اور inertia۔

URDF فائلیں Gazebo جیسے tools کے ذریعے سیمولیشن اور RViz کے ذریعے visualization کے لیے استعمال ہوتی ہیں۔ یہ کسی بھی روبوٹکس ایپلیکیشن کے لیے ضروری ہیں جو روبوٹ کی جسمانی ساخت کا ماڈل چاہتی ہو۔
