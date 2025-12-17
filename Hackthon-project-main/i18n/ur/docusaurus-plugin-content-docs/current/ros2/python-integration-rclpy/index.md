---
title: Python انٹیگریشن (rclpy)
---

# Python انٹیگریشن (rclpy)

`rclpy` ROS 2 کے لیے آفیشل Python client library ہے۔ یہ Pythonic interface فراہم کرتا ہے جو ROS 2 کے تمام بنیادی تصورات کو استعمال کرنے کی اجازت دیتا ہے، جس سے developers Python میں ROS 2 nodes، publishers، subscribers، services، اور actions لکھ سکتے ہیں۔

یہاں `rclpy` میں ایک "hello world" publisher کی سادہ مثال دی گئی ہے:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloWorldPublisher(Node):

    def __init__(self):
        super().__init__('hello_world_publisher')
        self.publisher_ = self.create_publisher(String, 'hello_world', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello, ROS 2!'
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    hello_world_publisher = HelloWorldPublisher()
    rclpy.spin(hello_world_publisher)
    hello_world_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
