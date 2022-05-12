puts "Create users!"
User.destroy_all
user_one = User.create(email: 'v@k.ca', password: '123456')
user_two = User.create(email: 'ab@c.ca', password: '123456')
user_three = User.create(email: 'john@gmail.ca', password: '123456')