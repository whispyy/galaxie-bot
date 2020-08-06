pipeline {
  agent any

  environment {
    GIT_BRANCH = getBranchName()
  }

  stages {
    stage('Clone Sources') {
      steps {
        git url: 'git@github.com:whispyy/galaxie-bot.git', branch: env.GIT_BRANCH
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t galaxie-bot .'
      }
    }

    stage('Deploy') {
      steps {
        sh '''#!/bin/bash
          echo $GIT_BRANCH;
          if test "$GIT_BRANCH" = 'master'; then
            chmod 777 ./deploy.sh
            ./deploy.sh
          fi
        '''
      }
    }

  }

  post {
    success {
      discordSend description: 'Deploy has been succeeded', link: currentBuild.absoluteUrl, successful: currentBuild.resultIsBetterOrEqualTo('SUCCESS'), title: JOB_NAME, webhookURL: env.GangBotDiscordURL
    }

    failure {
      discordSend description: 'Deploy failed', link: currentBuild.absoluteUrl, successful: currentBuild.resultIsBetterOrEqualTo('SUCCESS'), title: JOB_NAME, webhookURL: env.GangBotDiscordURL
    }
  }

}

def getBranchName() {
  return env.BRANCH_NAME;
}
