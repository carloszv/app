import { DragEventMock } from './../mocks/drag-event-mock';
import { Renderer2 } from '@angular/core';
import { DragEventService } from './drag-event-service';
import { TestBed, async } from '@angular/core/testing';

describe('Provider: DragEventService', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                Renderer2,
            ],
            imports: []
        }).compileComponents();
    }));

    it('should prevent standard action for dragstart', () => {
        let service = new DragEventService();
        let event = new DragEventMock('dragstart');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(event, null, null, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragover', () => {
        let service = new DragEventService();
        let event = new DragEventMock('dragover');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(event, null, null, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragenter', () => {
        let service = new DragEventService();
        let event = new DragEventMock('dragenter');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(event, () => { }, null, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragleave', () => {
        let service = new DragEventService();
        let event = new DragEventMock('dragleave');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(event, null, () => { }, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should execute enterFunction on first dragenter', () => {
        let service = new DragEventService();
        let event = new DragEventMock('dragenter');
        let functionExecuted = false;
        service.handleDragEvent(event, () => functionExecuted = true, null, null);
        expect(functionExecuted).toBeTruthy();
    });

    it('should set copy pointer on dragenter function', () => {
        let service = new DragEventService();
        let event = new DragEventMock('dragenter');
        service.handleDragEvent(event, () => { }, null, null);
        expect(event.dataTransfer.dropEffect).toEqual('copy');
    });

    it('should execute leaveFunction on leave', () => {
        let service = new DragEventService();
        let enterEvent = new DragEventMock('dragenter');
        let leaveEvent = new DragEventMock('dragleave');
        let functionExecuted = false;
        service.handleDragEvent(enterEvent, () => { }, null, null);
        expect(functionExecuted).toBeFalsy();
        service.handleDragEvent(leaveEvent, null, () => functionExecuted = true, null);
        expect(functionExecuted).toBeTruthy();
    });

    it('should not execute leaveFunction if element not left', () => {
        let service = new DragEventService();
        let enterEvent = new DragEventMock('dragenter');
        let leaveEvent = new DragEventMock('dragleave');
        let functionExecuted = false;
        service.handleDragEvent(enterEvent, () => { }, null, null);
        service.handleDragEvent(enterEvent, () => { }, null, null);
        service.handleDragEvent(leaveEvent, null, () => functionExecuted = true, null);
        expect(functionExecuted).toBeFalsy();
    });

    it('should execute drop function on drop', () => {
        let service = new DragEventService();
        let event = new DragEventMock('drop');
        let functionExecuted = false;
        service.handleDragEvent(event, null, null, () => functionExecuted = true);
    });

    it('should reset counter  on drop', () => {
        let service = new DragEventService();
        let event = new DragEventMock('drop');
        let functionExecuted = false;
        spyOn(service.dragEventCounter, 'reset').and.callThrough();
        service.handleDragEvent(event, null, null, () => functionExecuted = true);
        expect(service.dragEventCounter.reset).toHaveBeenCalledTimes(1);
    });
});
