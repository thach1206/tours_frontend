import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../common/promotion';

declare var bootstrap: any;

@Component({
  selector: 'app-quan-ly-khuyen-mai',
  templateUrl: './quan-ly-khuyen-mai.component.html',
  styleUrl: './quan-ly-khuyen-mai.component.css'
})
export class QuanLyKhuyenMaiComponent implements OnInit {

  form: any = {
    id: null,
    code: null,
    discountPercentage: null,
    maxDiscountAmount: null,
    description: null,
    qualityOnHand: null,
    hidden: false,
    active: true,
    statusAction: "ACTIVE",
    startDate: new Date('2024-11-01'),
    endingDate: new Date('2024-12-31')
  };

  promotions: Promotion[] = [];

  currentId: number = 1;

  constructor(private promotionService: PromotionService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.getAllPromotion();
  }

  getAllPromotion() {
    this.promotionService.getAll().subscribe(
      (response) => {
        console.log(response)
        this.promotions = response.result;
      }
    )
  }

  setCurrentId(id: number) {
    this.currentId = id;
  }

  deletePromotion() {
    this.promotionService.deletePromotion(this.currentId).subscribe(
      (data: any) => {
        console.log(data.result)
        const modalElement = document.getElementById('deleteModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllPromotion();

      },
      (error) => {
        console.log(error)
      }
    )
  }

  saveChanges() {
    console.log("form update: ")
    console.log(this.form)
    this.promotionService.updatePromotion(this.form).subscribe(
      (res) => {
        console.log('Promotion uploaded successfully:', res);
        const modalElement = document.getElementById('editPromotionModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllPromotion();
      },
      (error) => {
        console.error('Error uploading promotion:', error);
      }
    );
  }

  editPromotion(id: number) {
    this.promotionService.getById(id).subscribe(
      (data: any) => {
        this.form = data.result;
        const startDate = new Date(data.result.startDate);
        this.form.startDate = startDate.toISOString().slice(0, 16);

        const endingDate = new Date(data.result.endingDate);
        this.form.endingDate = endingDate.toISOString().slice(0, 16);
      }
    )
  }

  createPromotion() {
    this.promotionService.createNew(this.form).subscribe(
      (res) => {
        console.log('Promotion creation successfully:', res);
        const modalElement = document.getElementById('createPromotionModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllPromotion();
      },
      (error) => {
        console.error('Error creating promotion:', error);
      }
    )
  }

}
