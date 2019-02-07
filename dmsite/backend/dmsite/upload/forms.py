from django import forms

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=200)
    file = forms.FileField()
    file_field = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))