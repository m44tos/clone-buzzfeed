import { Component, OnInit } from '@angular/core';
import quizData from '../../../assets/data/quiz-data.json'
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  
  title:string="";

  questions:any;
  questSelected:any;
  
  answers:string[]=[];
  answerSelected:string="";

  questionIndex:number=0;
  questionMaxIndex:number=0;

  finished:boolean=false;

  constructor(){}
  ngOnInit(): void {
    if(quizData){
      this.finished=false;
      this.title = quizData.title;

      this.questions = quizData.questions;
      this.questSelected = this.questions[this.questionIndex]
    
      this.questionIndex=0;
      this.questionMaxIndex = this.questions.length;
    
    }
  }
  btnPress(value:string){
    this.answers.push(value);
    this.nextStep();
  }
  async nextStep(){
    this.questionIndex+=1;

    if(this.questionMaxIndex > this.questionIndex){
        this.questSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished=true;
      this.answerSelected=quizData.results[finalAnswer as keyof typeof quizData.results];
    }
  }
  checkResult(answers:string[]){
    const resultado=answers.reduce((previous, current, i, arr)=>{
      if (arr.filter(item => item === previous).length > arr.filter(item=> item === current).length) {
        return previous
      } else {
        return current
      }
    });
    return resultado;
  }
}
