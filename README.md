# [Optic Pass](https://lucas-burdell.github.io/OpticPass/)

## What is Optic Pass?

Optic Pass is a password manager that doesn't store passwords, and instead derives them from a password that the user remembers. The app creates an HMAC hash of a 'subject' and an 'increment' using the inputted password as the key. The subject is whatever the password is for, and increment is an addition to the subject to account for password change requirements, like required quarterly password changes. The app can be installed as a [Progressive Web App](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/). As such, the app can work offline on many mobile and desktop platforms, and is able to be installed as a standalone application.

Optic Pass was built for users who don't want to commit to a password manager (which costs money) and who otherwise would use a single password for every application. Compared to the single-password-for-everything approach, this application provides more security in the event an application has a mass data-breach. If one of the sites you use get hacked and password hash dumps are stolen, a password created using Optic Pass is not going to be susceptible to dictionary-based attacks. If the hash is somehow cracked or the generated password otherwise revealed, it is infeasible to reverse-engineer the generated password to get the master password.

bump
