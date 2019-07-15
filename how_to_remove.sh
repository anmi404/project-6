echo "FILE_NAME" >> .gitignore
git rm --cached FILE_NAME
git add -u
git commit -m "removing files from version control"

git pull
git push master

git update-index --assume-unchanged <file>

and it's inverse:
   git update-index --no-assume-unchanged <file>

git remote set-url origin https://github.com/anmi404/project-6/

git remote -v

echo "# notTheFirePeople" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/anmi404/notTheFirePeople.git
git push -u origin master

